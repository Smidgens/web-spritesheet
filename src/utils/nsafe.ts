// smidgens @ github

type NullyMethod0 = (() => void)|null|undefined;
type NullyMethod1<T> = ((v:T) => void)|null|undefined;

export class NoOp {
	static Arg0(){}
	static Arg1<T>(_:T){}
	static Arg2<T1,T2>(_1:T1,_2:T2){}
	private constructor(){}
}


/**
 * Nullsafe invoke shorthands
 *
 * @export
 * @class NullSafe
 * @typedef {NullSafe}
 */
export class NullSafe {

	static Invoke0(fn:NullyMethod0) {
		if(fn){ fn(); }
	}

	static Invoke1<T>(fn:NullyMethod1<T>, arg:T) {
		if(fn){ fn(arg); }
	}

	private constructor(){}
}