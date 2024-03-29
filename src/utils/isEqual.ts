import { IPlainObject } from '../types';

export const isEqualTo = (lhs: string, rhs: string): boolean => lhs === rhs;

const isArray = (value: unknown) => {
	return Array.isArray(value);
};

const isPlainObject = (value: unknown) => {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
};

const isArrayOrObject = (value: unknown) => {
	return isPlainObject(value) || isArray(value);
};

export function isEqual(lhs: IPlainObject, rhs: IPlainObject): boolean {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}
	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value as IPlainObject, rightValue as IPlainObject)) {
				continue;
			}
			return false;
		}
		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}
