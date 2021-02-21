export interface AllergenI {
    _id: string,
    name: string,
    impactStartDelay: number,
    impactDuration: number,
    isAccumulative: boolean,
    priority: number
}