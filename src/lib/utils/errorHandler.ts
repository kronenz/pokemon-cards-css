/**
 * Error Handler Utility
 * Feature: 003-navigation-ui-renewal
 * Backend Integration: Centralized error handling for PocketBase
 */

import { goto } from '$app/navigation';

export class AppError extends Error {
	constructor(
		message: string,
		public code: string,
		public fieldErrors?: Record<string, string>
	) {
		super(message);
		this.name = 'AppError';
	}
}

/**
 * Handle PocketBase errors with type-safe AppError
 * @param error - PocketBase error object
 * @returns AppError with translated message
 */
export function handlePocketBaseError(error: any): AppError {
	// Debug logging in development
	if (import.meta.env.DEV) {
		console.error('[PocketBase Error]', {
			status: error.status,
			message: error.message,
			data: error.data,
			response: error.response
		});
	}

	// Unauthorized - redirect to login
	if (error.status === 401) {
		goto('/login');
		return new AppError('로그인이 필요합니다', 'UNAUTHORIZED');
	}

	// Validation errors - extract field-level errors
	if (error.status === 400 || error.status === 422) {
		const fieldErrors: Record<string, string> = {};
		let detailedMessage = '입력값이 올바르지 않습니다';

		if (error.data?.data) {
			const errorMessages: string[] = [];
			for (const [field, err] of Object.entries(error.data.data as Record<string, any>)) {
				const fieldError = (err as any).message || String(err);
				fieldErrors[field] = translateFieldError(field, fieldError);
				errorMessages.push(fieldErrors[field]);
			}
			if (errorMessages.length > 0) {
				detailedMessage = errorMessages.join(', ');
			}
		} else if (error.message) {
			detailedMessage = error.message;
		}

		return new AppError(detailedMessage, 'VALIDATION_ERROR', fieldErrors);
	}

	// Not found
	if (error.status === 404) {
		return new AppError('요청한 데이터를 찾을 수 없습니다', 'NOT_FOUND');
	}

	// Forbidden
	if (error.status === 403) {
		return new AppError('접근 권한이 없습니다', 'FORBIDDEN');
	}

	// Server error
	if (error.status >= 500) {
		return new AppError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'SERVER_ERROR');
	}

	// Generic error
	return new AppError(error.message || '알 수 없는 오류가 발생했습니다', 'UNKNOWN_ERROR');
}

/**
 * Translate field-level errors to Korean
 */
function translateFieldError(field: string, message: string): string {
	const fieldNames: Record<string, string> = {
		email: '이메일',
		password: '비밀번호',
		passwordConfirm: '비밀번호 확인',
		name: '이름',
		username: '사용자명'
	};

	const errorPatterns: Record<string, string> = {
		'cannot be blank': '을(를) 입력해주세요',
		'must be a valid email': '형식이 올바르지 않습니다',
		'must be at least': '자 이상이어야 합니다',
		'values don\'t match': '가 일치하지 않습니다',
		'already exists': '이(가) 이미 사용 중입니다',
		'is not valid': '이(가) 유효하지 않습니다'
	};

	const fieldName = fieldNames[field] || field;

	for (const [pattern, translation] of Object.entries(errorPatterns)) {
		if (message.toLowerCase().includes(pattern.toLowerCase())) {
			return `${fieldName}${translation}`;
		}
	}

	return `${fieldName}: ${message}`;
}

/**
 * Display error as toast notification
 * @param error - AppError or Error object
 */
export function showErrorToast(error: AppError | Error) {
	// This will be implemented with ToastNotification component
	console.error(error);
}
