import * as readline from 'readline';

class Shape {
   
    protected color: string;

    
    constructor(color: string) {
        this.color = color;
    }

  
    getArea(): number {
        return 0;
    }

    
    displayInfo(): void {
        console.log(`This is a ${this.color} shape.`);
    }
}


class Circle extends Shape {
   
    private radius: number;

    
    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    displayInfo(): void {
        super.displayInfo();
        console.log(`It is a circle with radius ${this.radius} and area ${this.getArea()}.`);
    }
}


class Rectangle extends Shape {

    private width: number;
    private height: number;


    constructor(color: string, width: number, height: number) {
        super(color);
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }

  
    displayInfo(): void {
        super.displayInfo();
        console.log(`It is a rectangle with width ${this.width}, height ${this.height}, and area ${this.getArea()}.`);
    }
}

function displayMenu(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('\n===== Menu =====');
        console.log('1. Create Circle');
        console.log('2. Create Rectangle');
        console.log('3. Exit');
        rl.question('Select an option (1-3): ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


async function handleUserChoice(choice: string): Promise<void> {
    switch (choice) {
        case '1':
            const circleRadius = parseFloat(await getInput('Enter circle radius: '));
            const circleColor = await getInput('Enter circle color: ');
            const newCircle = new Circle(circleColor, circleRadius);
            newCircle.displayInfo();
            break;
        case '2':
            const rectWidth = parseFloat(await getInput('Enter rectangle width: '));
            const rectHeight = parseFloat(await getInput('Enter rectangle height: '));
            const rectColor = await getInput('Enter rectangle color: ');
            const newRectangle = new Rectangle(rectColor, rectWidth, rectHeight);
            newRectangle.displayInfo();
            break;
        case '3':
            console.log('Exiting the program.');
            process.exit(0);
            break;
        default:
            console.log('Invalid choice. Please enter a number between 1 and 3.');
            break;
    }
}


function getInput(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


async function main() {
    while (true) {
        const userChoice = await displayMenu();
        await handleUserChoice(userChoice);
    }
}


main();


