import { TimeGraphUnitController } from "./time-graph-unit-controller";

export class TimeGraphStateController {
    oldPositionOffset: {
        x: number;
        y: number;
    };
    /**
        It is not the width of the canvas display buffer but of the canvas element in browser. Can be different depending on the display pixel ratio.
    */
    readonly canvasDisplayWidth: number;
    /**
        It is not the heigth of the canvas display buffer but of the canvas element in browser. Can be different depending on the display pixel ratio.
    */
    readonly canvasDisplayHeight: number;

    protected _zoomFactor: number;
    protected _initialZoomFactor: number;
    protected _positionOffset: {
        x: number;
        y: number;
    };

    protected zoomChangedHandler: (() => void)[];
    protected positionChangedHandler: (() => void)[];

    constructor(protected canvas: HTMLCanvasElement, protected unitController: TimeGraphUnitController) {
        const ratio = window.devicePixelRatio;
        this.canvasDisplayWidth = canvas.width / ratio;
        this.canvasDisplayHeight = canvas.height / ratio;
        this._initialZoomFactor = this.zoomFactor;
        this._positionOffset = { x: 0, y: 0 };
        this.oldPositionOffset = { x: 0, y: 0 };
        this.zoomChangedHandler = [];
        this.positionChangedHandler = [];
    }

    protected handleZoomChange() {
        this.zoomChangedHandler.map(handler => handler());
    }
    protected handlePositionChange() {
        this.positionChangedHandler.map(handler => handler());
    }

    onZoomChanged(handler: () => void) {
        this.zoomChangedHandler.push(handler);
    }
    onPositionChanged(handler: () => void) {
        this.positionChangedHandler.push(handler);
    }

    get initialZoomFactor(): number {
        return this._initialZoomFactor;
    }

    get zoomFactor(): number{
        this._zoomFactor = this.canvasDisplayWidth / this.unitController.viewRangeLength;
        return this._zoomFactor;
    }

    get absoluteResolution(): number {
        return this.canvasDisplayWidth / this.unitController.absoluteRange;
    }

    get positionOffset(): {
        x: number;
        y: number;
    } {
        return this._positionOffset;
    }
    set positionOffset(value: {
        x: number;
        y: number;
    }) {
        this._positionOffset = value;
        this.handlePositionChange();
    }
}