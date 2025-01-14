class Example {
  constructor(firstMultiplier, secondMultiplier) {
    this.firstMultiplier = firstMultiplier;
    this.secondMultiplier = secondMultiplier;
  }

  render() {
    const content = `
      <div class="example">
        <p>${this.firstMultiplier} × ${this.secondMultiplier} = </p>
        <input type="number" id="answerInput" placeholder="Your answer">
      </div>
    `;
    return content;
  }
}

export default Example;
