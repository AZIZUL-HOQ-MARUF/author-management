export class Author {
    _id: string;
    name: string;
    bio: string;
    isFav: boolean;
    constructor(options: any = {}) {
        this._id = options._id || null;
        this.name = options.name || "";
        this.bio = options.bio || "";
        this.isFav = options.isFav || false;
    }
}