class News {
  constructor(
    id,
    headline,
    date,
    author,
    agency,
    description,
    imageUrl,
    category
  ) {
    this.id = id;
    this.headline = headline;
    this.date = date;
    this.author = author;
    this.agency = agency;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category; // "US", "World", or "Tech"
  }

  toString() {
    return `${this.headline} (${this.category}) - ${this.date} by ${this.author} [${this.agency}] - ${this.description} - Image URL: ${this.imageUrl}`;
  }
}

export default News;
