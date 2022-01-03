export default class categoryResolver {
    public static instance : categoryResolver;

    private categoryData : string[] = require("../../JSON/categories.json");
    private modificationThreshold : number = 10;
    private modificationCounter : number = 0;

    public static create() {
        if (categoryResolver.instance == null) {
            categoryResolver.instance = new categoryResolver();
        }

        return categoryResolver;
    }

    public getCategories = () => {
        return this.categoryData;
    }

    public pushCategory = () => {

    }
}