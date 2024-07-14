export interface Transaction {
    id: string;
    userId: string;
    walletId: string;
    depositId: string;
    transactionStatus: string;
    amount: number;
    description: string;
    bookingId: string;
    courtGroupName: string;
    createdOnUtc: string;
    modifiedOnUtc: string;
}