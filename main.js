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
        shadow.innerHTML = '';
        const wrapper = document.createElement('div');
        const number = this.getAttribute('number');
        const color = this.getColor(number);
        wrapper.style.backgroundColor = color;
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.borderRadius = '50%';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.fontSize = '24px';
        wrapper.style.fontWeight = 'bold';
        wrapper.style.color = 'white';
        wrapper.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        wrapper.textContent = number;
        shadow.appendChild(wrapper);
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
}

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
});
