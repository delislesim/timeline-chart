import * as PIXI from "pixi.js";
import { TimeGraphUnitController } from "./time-graph-unit-controller";
import { TimeGraphStateController } from "./time-graph-state-controller";
import { TimeGraphLayer } from "./layer/time-graph-layer";

export interface TimeGraphContainerOptions {
    id: string
    width: number
    height: number
    backgroundColor?: number
    transparent?: boolean
}

export class TimeGraphContainer {

    protected stage: PIXI.Container;
    protected _canvas: HTMLCanvasElement;

    protected stateController: TimeGraphStateController;

    protected layers: TimeGraphLayer[];

    constructor(protected config: TimeGraphContainerOptions, protected unitController: TimeGraphUnitController) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ratio = window.devicePixelRatio;
        canvas.style.width = config.width + 'px';
        canvas.style.height = config.height + 'px';
        canvas.width = config.width;
        canvas.height = config.height;
        canvas.id = config.id;
        canvas.className = 'time-graph-canvas';
        const application = new PIXI.Application({
            width: canvas.width,
            height: canvas.height,
            view: canvas,
            backgroundColor: config.backgroundColor,
            transparent: config.transparent,
            antialias: true,
            roundPixels: false,
            resolution: ratio
        });
        application.stage.height = config.height;
        // application.stage.scale = new PIXI.Point(ratio, ratio);

        this.stage = application.stage;
        this._canvas = application.view;

        this.stateController = new TimeGraphStateController(canvas, unitController);

        this.layers = [];
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    addLayer(layer: TimeGraphLayer) {
        this.layers.push(layer);
        layer.initializeLayer(this._canvas, this.stage, this.stateController, this.unitController);
    }
}