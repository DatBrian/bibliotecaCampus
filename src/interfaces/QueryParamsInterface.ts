interface QueryParams{
    table: string;
    select?: string;
    joins?: string;
    where?: string;
    orderBy?: string;
    limit?: number;
}
export default QueryParams