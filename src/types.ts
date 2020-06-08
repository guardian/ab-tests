export type ConfigType = {
	mvtMaxValue: number;
	mvtCookieId: number;
	pageIsSensitive: boolean;
	abTestSwitches: Record<string, boolean>;
	forcedTestVariant?: { testId: ABTest['id']; variant: Variant };
	forcedTestException?: ABTest['id'];
};

export type coreAPI = {
	runnableTest: (test: ABTest) => Runnable<ABTest> | null;
	allRunnableTests: (
		tests: ReadonlyArray<ABTest>,
	) => ReadonlyArray<Runnable<ABTest>> | [];
	firstRunnableTest: (
		tests: ReadonlyArray<ABTest>,
	) => Runnable<ABTest> | null;
};

export type OphanProduct =
	| 'CONTRIBUTION'
	| 'RECURRING_CONTRIBUTION'
	| 'MEMBERSHIP_SUPPORTER'
	| 'MEMBERSHIP_PATRON'
	| 'MEMBERSHIP_PARTNER'
	| 'DIGITAL_SUBSCRIPTION'
	| 'PRINT_SUBSCRIPTION';

export interface OphanABEvent {
	variantName: string;
	complete: string | boolean;
	campaignCodes?: ReadonlyArray<string>;
}

export type OphanABPayload = {
	[testId: string]: OphanABEvent;
};

export type OphanRecordFunction = (send: {
	[key: string]: OphanABPayload;
}) => void;

type ListenerFunction = (f: () => void) => void;

export interface Variant {
	id: string;
	test: (x: Record<string, unknown>) => void;
	campaignCode?: string;
	canRun?: () => boolean;
	impression?: ListenerFunction;
	success?: ListenerFunction;
}

export interface ABTest {
	id: string;
	start: string;
	expiry: string;
	author: string;
	description: string;
	audience: number;
	audienceOffset: number;
	successMeasure: string;
	audienceCriteria: string;
	showForSensitive?: boolean;
	idealOutcome?: string;
	dataLinkNames?: string;
	variants: ReadonlyArray<Variant>;
	canRun: () => boolean;
	notInTest?: () => void;
}

export type Runnable<ABTest> = ABTest & {
	variantToRun: Variant;
};

export type ServerSideTests = {
	[key: string]: string;
};

// We don't know what the error reporter for the platform might need
export type ErrorReporterFunc = (...args: unknown[]) => void;
