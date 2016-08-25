let container = PIXI.Container,
    Graphics = PIXI.Graphics;

export default class GluckGames {
    
    constructor(width,height) {
        this.width = width;
        this.height = height;
    }

    /*To initialize a scene
    * @param renderMode - used to set which mode PIXI has to render.
    */
    initializeScene(renderMode){
        this.setRenderMode(renderMode);
        this.stage = new container();
        this.renderer = this.renderScene(this.width, this.height);
        this.animate();
    }

    /* @method animate
    *  It is used to animate scene in render.
    */
    animate(){
        window.requestAnimationFrame(()=>this.animate());
        this.play();
        this.renderer.render(this.stage);
    }

    /* @method setRenderMode
    *  @param value
    *  Render mode change on runtime using this function or by default.
    */
    setRenderMode(value){
        if(value === 'auto'){
            this.renderScene = PIXI.autoDetectRenderer;
        }else if(value === 'WebGL'){
            this.renderScene = PIXI.WebGLRenderer;
        }else if(value === 'canvas'){
            this.renderScene = PIXI.CanvasRenderer;
        }
    }
    /* @method play.
    *  This is can be used by child class for animating their method.
    */
    play(){}

    /* @method setRenderBackground 
    *  @param color
    *  We change render  color of the background by using this method.
    */
    setRenderBackground(color){
        this.renderer.backgroundColor = color;
    }

    /* @method resizeScene 
    *  @param width
    *  @param height
    *  This is used to resize the screen on runtime.
    */
    resizeScene(width,height){
        this.renderer.autoResize = true;
        this.renderer.resize(width,height);
    }

    /* @method drawCircle 
    *  @param color - used to set color of the circle.
    *  @param radius - circle radius
    *  This is used to draw circle and return circle object.
    */
    drawCircle(color,radius){
        let circle = new Graphics();
        circle.beginFill(color);
        circle.drawCircle(0, 0, radius);
        circle.endFill();
        return circle
    }

    /* @method drawRectangle 
    *  @param properties - object has many properties like line width,color,fill color etc.
    *  @param radius - circle radius
    *  This is used to draw rectangle or rounded rectangle based on properties object it will draw and return rectangle object.
    */
    drawRectangle(properties){
        let rectangle = new Graphics();
        if(properties.line){
            rectangle.lineStyle(properties.lineWidth, properties.lineColor, 1);
        }
        rectangle.beginFill(properties.fillColor);
        if(properties.rounded){
            rectangle.drawRoundedRect(0, 0, properties.width, properties.height,properties.radius);
        }else{
            rectangle.drawRect(0, 0, properties.width, properties.height);
        }
        rectangle.endFill();
        return rectangle;
    }
}
 
