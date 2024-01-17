import * as readline from 'readline';
class Shape {
    color;
    constructor(color) {
        this.color = color;
    }
    getArea() {
        return 0;
    }
    displayInfo() {
        console.log(`This is a ${this.color} shape.`);
    }
}
class Circle extends Shape {
    radius;
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    displayInfo() {
        super.displayInfo();
        console.log(`It is a circle with radius ${this.radius} and area ${this.getArea()}.`);
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    displayInfo() {
        super.displayInfo();
        console.log(`It is a rectangle with width ${this.width}, height ${this.height}, and area ${this.getArea()}.`);
    }
}
function displayMenu() {
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
async function handleUserChoice(choice) {
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
function getInput(prompt) {
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
