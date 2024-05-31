import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef , NgZone, OnInit} from '@angular/core';
import * as PDFJS from 'src/app/demo/pages/redaction/pdf.js';

import {jsPDF} from 'jspdf';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-redactor',
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.css']
})
export class RedactorComponent implements AfterViewInit , OnInit{

  @ViewChild('myCanvas') __CANVAS!: ElementRef;
  public __CANVAS_CTX!: CanvasRenderingContext2D ;

  public __PDF_DOC : any;
  public __CURRENT_PAGE : any;

  public __TOTAL_PAGES : any ;

  public __PAGE_RENDERING_IN_PROGRESS = 0;
  public curPage : any;
  public img = new Image;
  public buff : any []= [];
  public storedRects : any[] = []; // so far we only deal with single page editor, if multipaged. we will need to update
  // to update the redo and undo structure, with multi buffs, or we just commit the change, and forget about re-editing
  public allPages : any [] = [];
  public rectT : any;
  public show = false;
  public refresh = true;
  public fillColor="#000000";
  public mouse = {
    button: false,
    x: 0,
    y: 0,
    down: false,
    up: false,
    that: this,
    event(e: any) {
      const rectCanv = this.that.__CANVAS.nativeElement.getBoundingClientRect();
      const m = this.that.mouse;
      m.x = (e.clientX - rectCanv.left) / (rectCanv.right - rectCanv.left) * this.that.__CANVAS.nativeElement.width;
      m.y = (e.clientY - rectCanv.top) / (rectCanv.bottom - rectCanv.top) * this.that.__CANVAS.nativeElement.height;
      const prevButton = m.button;
      m.button = e.type === 'mousedown' ? true : e.type === 'mouseup' ? false : this.that.mouse.button;
      if (!prevButton && m.button) {
        m.down = true;
      }
      if (prevButton && !m.button) {
        m.up = true;
      }
    }
  };


  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Refresh the page when navigation ends
        window.location.reload();
      });
  }
  
  ngAfterViewInit(): void {
    this.show = false;
    this.__CANVAS_CTX = (<HTMLCanvasElement>this.__CANVAS.nativeElement).getContext('2d')!;
    this.rectT = this.rect();
  
    const that = this;
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(mainLoop);
      function mainLoop() {
        that.refresh = true;
        if (that.refresh || that.mouse.down || that.mouse.up || that.mouse.button) {
          that.refresh = false;
          if (that.mouse.down) {
            that.mouse.down = false;
            that.rectT.restart(that.mouse);
          } else if (that.mouse.button) {
            that.rectT.update(that.mouse);
          } else if (that.mouse.up) {
            that.mouse.up = false;
            that.rectT.update(that.mouse);
            const tempRect = that.rectT.toRect();
            const m = that.mouse;
            if (isFinite(tempRect.x) && isFinite(tempRect.y) && isFinite(tempRect.w) && isFinite(tempRect.h)
              && tempRect.w !== 0 && tempRect.h !== 0 // only if the mouse lands in the canvas, ok
              && m.x > 0 && m.x < that.__CANVAS_CTX.canvas.width && m.y > 0 && m.y < that.__CANVAS_CTX.canvas.height) {
              that.__CANVAS_CTX.fillStyle = that.fillColor;
              tempRect.draw(that.__CANVAS_CTX);
              that.storedRects.push(tempRect);
              that.buff = []; // once the editor starts to edit, the editor commits to the change so far, so redo is emptied out
              const canv = document.createElement('canvas');
              const canv_con = canv.getContext('2d')!;
              canv.width = that.__CANVAS_CTX.canvas.width;
              canv.height = that.__CANVAS_CTX.canvas.height;
              canv_con.drawImage(that.__CANVAS.nativeElement, 0, 0, that.__CANVAS_CTX.canvas.width, that.__CANVAS_CTX.canvas.height);
              that.allPages[that.__CURRENT_PAGE - 1] = canv;
            }
          }
          that.draw();
        }
        requestAnimationFrame(mainLoop);
      }
    });
  }

  constructor(public ngZone: NgZone, private router:Router) {

  }
  
  
  // Other methods remain unchanged
  

/*
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Refresh the page when navigation ends
        window.location.reload();
      });
  }
  
  constructor(public ngZone: NgZone, private router:Router) {
    const that = this;
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(mainLoop);
      function mainLoop() {
        that.refresh = true;
        if (that.refresh || that.mouse.down || that.mouse.up || that.mouse.button) {
           that.refresh = false;
          if (that.mouse.down) {
            that.mouse.down = false;
            that.rectT.restart(that.mouse);
          } else if (that.mouse.button) {
            that.rectT.update(that.mouse);
          } else if (that.mouse.up) {
            that.mouse.up = false;
            that.rectT.update(that.mouse);
            const tempRect = that.rectT.toRect();
            const m = that.mouse;
            if (isFinite(tempRect.x) && isFinite(tempRect.y) && isFinite(tempRect.w) && isFinite(tempRect.h)
              && tempRect.w !== 0 && tempRect.h !== 0 // only if the mouse land in the canvas,ok
              && m.x > 0 && m.x < that.__CANVAS.nativeElement.width && m.y > 0 && m.y < that.__CANVAS.nativeElement.height) {
              that.__CANVAS_CTX.fillStyle = that.fillColor;
              tempRect.draw(that.__CANVAS_CTX);
              that.storedRects.push(tempRect);
              that.buff = []; // once the editor start to edit, the editor commits to the change so far, so redo is emptied out
              const canv = document.createElement('canvas');
              const canv_con = canv.getContext('2d')!;
              canv.width = that.__CANVAS_CTX.canvas.width;
              canv.height = that.__CANVAS_CTX.canvas.height;
              canv_con.drawImage(that.__CANVAS.nativeElement, 0, 0, that.__CANVAS_CTX.canvas.width, that.__CANVAS_CTX.canvas.height);
              that.allPages[that.__CURRENT_PAGE - 1] = canv;
            }
          }
          that.draw();
        }
        requestAnimationFrame(mainLoop);
      }
    });
  }
*/

  rect(): object {
    let x1: number, y1: number, x2: number, y2: number;
    let show = false;
    const rectT = { x: 0, y: 0, w: 0, h: 0, draw };

    function fix() {
      rectT.x = Math.min(x1, x2);
      rectT.y = Math.min(y1, y2);
      rectT.w = Math.max(x1, x2) - Math.min(x1, x2);
      rectT.h = Math.max(y1, y2) - Math.min(y1, y2);
    }

    function draw(this: typeof rectT, ctx: CanvasRenderingContext2D) {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    const API = {
      restart(point: { x: number, y: number }) {
        x2 = x1 = point.x;
        y2 = y1 = point.y;
        fix();
        show = true;
      },
      update(point: { x: number, y: number }) {
        x2 = point.x;
        y2 = point.y;
        fix();
        show = true;
      },
      toRect() {
        show = false;
        return { ...rectT }; // Using spread operator to clone rectT
      },
      draw(ctx: CanvasRenderingContext2D) {
        if (show) {
          draw.call(rectT, ctx);
        }
      },
      show: false,
    };

    return API;
}

/*
  ngAfterViewInit(): void {
    this.show = false;
    this.__CANVAS_CTX = (<HTMLCanvasElement>this.__CANVAS.nativeElement).getContext('2d')!;
    this.rectT = this.rect();
  } */

  // Upon click this should should trigger click on the #file-to-upload file input element
  // This is better than showing the not-good-looking file input element
  uploadFile(): void {
    this.cleanCanvas();
    this.showPDF('http://localhost:4200/assets/test2.pdf');
    this.show = true;
  }

  // Previous action on the PDF
  undoAction(): void {
    if (this.storedRects.length > 0) {
      console.log(this.storedRects.length)
      this.buff.push(this.storedRects.pop());
    }
  }

  // Next action on the PDF
  redoAction(): void {
    if (this.buff.length > 0) {
            console.log(this.storedRects.length)

      this.storedRects.push(this.buff.pop());
    }
  }
  // Previous page of the PDF
  prevPage(): void {
    if (this.__CURRENT_PAGE !== 1) {
      this.cleanCanvas();
      this.showPage(--this.__CURRENT_PAGE, true);
    }
  }

  // Next page of the PDF
  nextPage(): void {
    if (this.__CURRENT_PAGE !== this.__TOTAL_PAGES) {
      this.cleanCanvas();
      this.showPage(++this.__CURRENT_PAGE, true);
    }
  }

  // Download button
  downloadFile(): void {
    let width = (<HTMLCanvasElement>this.__CANVAS.nativeElement).width;
    let height = (<HTMLCanvasElement>this.__CANVAS.nativeElement).height;
    let pdf = null;
    // set the height and width for the output pdf file
    if (width > height) {
      pdf = new jsPDF('l', 'px', [width, height]);
    } else {
      pdf = new jsPDF('p', 'px', [height, width]);
    }
    width = pdf.internal.pageSize.getWidth();
    height = pdf.internal.pageSize.getHeight();
    for (let i = 0; i < this.allPages.length; i++) {
      pdf.addImage(this.allPages[i], 'PNG', 0, 0, width, height, "", "FAST");
      if (i < (this.allPages.length - 1)) {
        pdf.addPage();  // this adds a new page
      }
    }
    pdf.save('download.pdf');
  }

  showPDF(pdf_url : any): void {
    const that = this;
    PDFJS.getDocument(pdf_url).promise.then(function (pdf_doc : any) {
      that.__PDF_DOC = pdf_doc;
      that.__TOTAL_PAGES = that.__PDF_DOC.numPages;
      that.showPage(1, false);
      that.preloadAllPages();
    }).catch(function (error : any) {
      alert(error.message);
    });
  }

  showPage(page_no : any, prev : any) {
    this.storedRects = [];
    this.buff = [];
    this.__PAGE_RENDERING_IN_PROGRESS = 1;
    this.__CURRENT_PAGE = page_no;
    // Fetch the page
    const that = this;
    this.__PDF_DOC.getPage(page_no).then(function (page : any) {
      const width = window.screen.availWidth - 50;
      // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
      const scale_required = width / page.getViewport(1).width;
      // Get viewport of the page at required scale //the scale is the % in the pdf file
      const viewport = page.getViewport(scale_required);

      // Set canvas width
      // Set canvas height
      that.__CANVAS.nativeElement.width = width;
      that.__CANVAS.nativeElement.height = viewport.height;

      const renderContext = {
        canvasContext: that.__CANVAS_CTX,
        viewport: viewport
      };
      // Render the page contents in the canvas
      page.render(renderContext).then(function () {
        that.__PAGE_RENDERING_IN_PROGRESS = 0;
        if (prev) {
          console.log(page_no);
          that.img.src = that.allPages[page_no - 1].toDataURL();
        } else {
          that.img.src = that.__CANVAS.nativeElement.toDataURL();
        }
      });
    });
  }

  draw() {
    this.__CANVAS_CTX.drawImage(this.img, 0, 0, this.__CANVAS_CTX.canvas.width, this.__CANVAS_CTX.canvas.height);
    this.__CANVAS_CTX.lineWidth = 1;
    this.__CANVAS_CTX.strokeStyle = 'black';
    this.__CANVAS_CTX.fillStyle = this.fillColor;
    this.storedRects.forEach(rect2 => rect2.draw(this.__CANVAS_CTX));
    this.__CANVAS_CTX.fillStyle = this.fillColor+"80";
    this.__CANVAS_CTX.strokeStyle = 'red';
    this.rectT.draw(this.__CANVAS_CTX);
    this.__CANVAS_CTX.fillStyle = this.fillColor;
  }
  cleanCanvas(): void {
    this.__CANVAS_CTX.clearRect(0, 0, this.__CANVAS_CTX.canvas.width, this.__CANVAS_CTX.canvas.height);
    this.fillColor="#000000";
    this.img.src = this.__CANVAS.nativeElement.toDataURL();
  }
  
  captureFile1(event: Event) {
    const fileInputEvent = event as InputEvent; // Example of type assertion
    this.cleanCanvas();
    this.showPDF(fileInputEvent);
    this.show = true;
}
  captureFile(file: string) {
    this.cleanCanvas();
    this.showPDF(file);
    this.show = true;
  }


  removeFile(event: string) {
    this.show = false;
  }

  preloadAllPages() {
    this.allPages = [];
    const that = this;
    for (let i = 1 ; i <= this.__TOTAL_PAGES; i++) {
      this.__PDF_DOC.getPage(i).then(function (page : any) {
        const width = window.screen.availWidth - 50;
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        const scale_required = width / page.getViewport(1).width;
        // Get viewport of the page at required scale //the scale is the % in the pdf file
        const viewport = page.getViewport(scale_required);
        const canv = document.createElement('canvas');
        const canv_con = canv.getContext('2d');
        // Set canvas width
        // Set canvas height
        canv.width = width;
        canv.height = viewport.height;

        const renderContext = {
          canvasContext: canv_con,
          viewport: viewport
        };
        // Render the page contents in the canvas
        page.render(renderContext).then(function () {
          that.allPages.push(canv);
        });
      });
    }
  }
}

