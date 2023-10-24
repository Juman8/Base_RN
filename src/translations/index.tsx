export * from './i18n';
export * from './locales';
type Space = ' ' | '\t' | '\n';

type Trim<S extends string> = S extends
  | `${Space}${infer T}`
  | `${infer T}${Space}`
  ? Trim<T>
  : S;

const removeSpaces = <S extends string>(input: S): Trim<S> => input as Trim<S>;
removeSpaces(' sd ');
