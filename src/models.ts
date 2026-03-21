import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id === id);
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((peli) => {
      let coincide = true;

      if (options.title) {
        coincide = coincide && peli.title.includes(options.title);
      }

      if (options.tag) {
        coincide = coincide && peli.tags.includes(options.tag);
      }

      return coincide;
    });
  }
}

export { PelisCollection, Peli };