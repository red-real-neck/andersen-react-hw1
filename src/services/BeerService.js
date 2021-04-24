export default class BeerService {
    constructor(url) {
      this._url = url;
      this.getSomeBeers = this.getSomeBeers.bind(this);
    }

    async getSomeBeers() {
      const res = await fetch(this._url);
      if (!res.ok) {
        throw new Error('Что-то пошло не так');
      }
      return await res.json();
    }
  }