document.addEventListener("DOMContentLoaded", function () {
    //Ondas fondo
    class Waves {
        //cambio
        constructor(options) {
            
            this.container = options.dom;
    
            this.perlin = new SimplexNoise();
            
            this.randomness = [];
            this.parameters = [];
            this.parameters.factor = 0.042;
            this.parameters.variation = 0.002;
            this.parameters.amplitude = 200;
            this.parameters.lines = 20;
            this.parameters.waveColor = { r: 221, g: 29, b: 225, a: 1 };
            this.parameters.shadowColor = { r: 90, g: 90, b: 137, a: 1 };
            this.parameters.shadowBlur = 14;
            this.parameters.lineStroke = 1;
            this.parameters.speed = 0.006;
            
            this.config();
            this.setSizes();
            this.setupCanvas();
            this.setupRandomness();
            this.drawPaths();
            this.render();
            this.setupResize();
            
        }
        
        config(){}
        
        setupCanvas(){
            this.context = this.container.getContext('2d');
            this.container.width = this.width * this.pixelRatio;
            this.container.height = this.height * this.pixelRatio;
            this.context.scale(this.pixelRatio, this.pixelRatio);
        }
        
        setSizes(){
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 1.5);
            this.container.width = this.width;
            this.container.height = this.height;
        }
        
        setupRandomness(){
            for( let i = 0, rand = 0; i < this.parameters.lines; i++, rand += this.parameters.factor ) {
                this.randomness[i] = rand;
            }
        }
        
        drawPaths(){
            
            this.context.shadowColor = "rgba(" + this.parameters.shadowColor.r + ", " + this.parameters.shadowColor.g + ", " + this.parameters.shadowColor.b + "," + this.parameters.shadowColor.a + ")";
            this.context.shadowBlur = this.parameters.shadowBlur;
            this.context.lineWidth = this.parameters.lineStroke;
            
            for( let i = 0; i <= this.parameters.lines; i++ ) {
    
                this.context.beginPath();
                this.context.moveTo(0, this.height/2);
    
                let randomY = 0;
                for( let x = 0; x <= this.width; x++ ) {
                    randomY = this.perlin.noise3D( x * this.parameters.variation + this.randomness[i], x * this.parameters.variation, 1);
                    this.context.lineTo(x, this.height/2 + (this.parameters.amplitude + Math.random() * 0.005) * randomY);
                }
                
                this.alpha = Math.min(Math.abs(randomY) + 0.001, 0.3);
                this.context.strokeStyle = "rgba(" + this.parameters.waveColor.r + ", " + this.parameters.waveColor.g + ", " + this.parameters.waveColor.b + "," + ( this.alpha * 2 ) + ")";
                this.context.stroke();
                this.context.closePath();
                this.randomness[i] += this.parameters.speed;
                
            }
            
        }
        
        setupResize(){
            window.addEventListener('resize', this.resize.bind(this));
        }
        
        resize(){
            this.setSizes();
            this.setupCanvas();
        }
        
        render(){
            console.log("Canvas renderizando");
            this.context.clearRect(0, 0, this.width, this.height);
            this.drawPaths();
        
            setTimeout(() => {
                window.requestAnimationFrame(this.render.bind(this));
            }, 1000 / 60 );
        
        }
    
    }
    
    new Waves({
        dom: document.getElementById('webgl')
    });
    
    
    //Acordeón de Aptitudes
    const botones = document.querySelectorAll(".titulo-acord");

        // Abre el primer acordeón por defecto
        botones[0].setAttribute("aria-expanded", "true");
        botones[0].nextElementSibling.style.display = "block";

        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                const contenido = boton.nextElementSibling;
                const estaAbierto = boton.getAttribute("aria-expanded") === "true";

                // Cierra todos los acordeones excepto el que se va a abrir
                botones.forEach(b => {
                    b.setAttribute("aria-expanded", "false");
                    b.nextElementSibling.style.display = "none";
                });
                
                // Alternar estado del botón clickeado
                if (!estaAbierto) {
                    boton.setAttribute("aria-expanded", "true");
                    contenido.style.display = "block";
                }
            });
        });

    //Rotación de Roles en el Header
    const roles = ["Desarrollo Back-End", "Desarrollo Front-End", "Machine Learning", "Data Base"];
    let index = 0;
    const rolDinamico = document.getElementById("rol-dinamico");
    function cambiarTexto() {
        rolDinamico.classList.add("fade-out"); 
        setTimeout(() => {
            rolDinamico.textContent = roles[index];
            rolDinamico.classList.remove("fade-out");
            index = (index + 1) % roles.length;
        }, 500); 
    }

    setInterval(cambiarTexto, 3000);
});
