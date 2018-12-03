   
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const center_x = canvas.width/2;
    const center_y = canvas.height/2;

    const Stars = [];

    function Star(x, y, velocity) {
        this.x = x * velocity;
        this.y = y * velocity;
        this.velocity = velocity;
        this.pos_x = center_x;
        this.pos_y = center_y;
    }
    
    const StarGenerator = () => {
        const degrees = Math.random() * 6.28;
        const x = Math.sin(degrees);
        const y = Math.cos(degrees);
        const velocity = 1 + Math.random() * 2;
        Stars.push(new Star(x, y, velocity))
    }

let starer = 0;

    const Update = () => {
        // starer ++;
        // if(starer%3===0) 
        StarGenerator();
        context.fillStyle = 'rgb(' + 0 + ', ' + 0 + ', ' + 0 + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        RenderStars();
        context.fillStyle = 'rgb(' + 0 + ', ' + 0 + ', ' + 0 + ')';
        context.fillRect(center_x-3, center_y-3, 8, 8);

    }
    
    const RenderStar = (Star) => {
        // console.log(Star);
        context.fillStyle = 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')';
        context.fillRect(Star.pos_x, Star.pos_y, 2, 2);
        Star.pos_x *= Star.x;
        Star.pos_y *= Star.y;
    }
    const RenderStars = () => {
        Stars.forEach((Star) => {
            RenderStar(Star);
        });
    }

    setInterval(Update, 20);