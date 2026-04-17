console.log('Lotto script starting...');

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const shadow = this.shadowRoot;
        const number = this.getAttribute('number');
        if (number === null) return;

        shadow.innerHTML = `
            <style>
                div {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    background-color: ${this.getColor(number)};
                }
            </style>
            <div>${number}</div>
        `;
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#f44336';
        if (num <= 20) return '#ff9800';
        if (num <= 30) return '#ffc107';
        if (num <= 40) return '#4caf50';
        return '#2196f3';
    }
}

// Define the custom element only if it's not already defined.
if (!customElements.get('lotto-ball')) {
  customElements.define('lotto-ball', LottoBall);
  console.log('lotto-ball custom element defined');
}

const generateBtn = document.getElementById('generate-btn');
if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        console.log('Generate button clicked');
        const lottoNumbersContainer = document.getElementById('lotto-numbers');
        if (!lottoNumbersContainer) {
            console.error('lotto-numbers container not found!');
            return;
        }
        lottoNumbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        
        // Convert Set to array and sort numbers for better UX
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        console.log('Generated numbers:', sortedNumbers);

        sortedNumbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        });
    });
} else {
    console.error('generate-btn not found!');
}
