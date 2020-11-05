declare type PushFront<TailT extends any[], FrontT> = [FrontT, ...TailT];
declare type Tuple<
  ElementT,
  LengthT extends number,
  OutputT extends any[] = []
> = {
  0: OutputT;
  1: Tuple<ElementT, LengthT, PushFront<OutputT, ElementT>>;
}[OutputT['length'] extends LengthT ? 0 : 1];
declare type TupleFirst<
  ElementT,
  LengthT extends number,
  OutputT extends any[] = []
> = {
  0: ElementT[];
  1: Tuple<ElementT, LengthT, PushFront<OutputT, ElementT>>;
}[OutputT['length'] extends LengthT ? 0 : 1];
interface Result<T extends number> {
  getPermutationsFromId: (id: number) => TupleFirst<number, T>;
  getIdFromPermutations: (permutations: TupleFirst<number, T>) => number;
}
declare type defaultExport = <T extends number>(input: T) => Result<T>;
declare const defaultFunction: defaultExport;
export default defaultFunction;
