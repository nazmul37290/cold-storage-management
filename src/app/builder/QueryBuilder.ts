import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

 dateRange(field = "date") {
  const startDate = this.query.startDate as string | undefined;
  const endDate = this.query.endDate as string | undefined;

  if (!startDate && !endDate) return this;

  const range: Record<string, Date> = {};

  if (startDate) {
    const s = new Date(startDate);
    s.setHours(0, 0, 0, 0);
    range.$gte = s;
  }

  if (endDate) {
    const e = new Date(endDate);
    e.setHours(23, 59, 59, 999);
    range.$lte = e;
  }

  this.modelQuery = this.modelQuery.find({ [field]: range } as any);
  return this;
}


    search(searchableFields: string[]) {
        const searchTerm=this?.query?.searchTerm
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                }) as FilterQuery<T>),
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields','startDate','endDate'];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
        return this
    }

    sort(){
        const sort =this?.query?.sort || '-createdAt';
        this.modelQuery= this.modelQuery.sort(sort as string)
        return this
    }
    paginate(){
        const limit =Number(this?.query?.limit) || 10 ;
        const page =Number(this?.query?.page) || 1 ;
        const skip =(page -1)*limit || 0 ;

        this.modelQuery= this.modelQuery.skip(skip).limit(limit)

        return this
    }

    limitFields(){
        const fields= (this.query.fields as string)?.split(',')?.join(' ') || "" ;
        this.modelQuery=this.modelQuery.select(fields);
        return this
    }
}


export default QueryBuilder



