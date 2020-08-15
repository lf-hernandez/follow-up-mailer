export interface CsvRecord {
    'Sales Record Number': string,
    'User Id': string,
    'Buyer Fullname': string,
    'Buyer Phone Number': string,
    'Buyer Email': string,
    'Buyer Address 1': string,
    'Buyer Address 2': string,
    'Buyer City': string,
    'Buyer State': string,
    'Buyer Zip': string,
    'Buyer Country': string,
    'Order ID': string,
    'Item ID': string,
    'Transaction ID': string,
    'Item Title': string,
    'Quantity': string,
    'Sale Price': string,
    'Shipping And Handling': string,
    'Sales Tax': string,
    'Insurance': string,
    'eBay Collected Tax': string,
    'Total Price': string,
    'Total Includes eBay Collected Tax': string,
    'Payment Method': string,
    'PayPal Transaction ID': string,
    'Sale Date': string,
    'Checkout Date': string,
    'Paid on Date': string,
    'Shipped on Date': string,
    'Shipping Service': string,
    'Feedback Left': string,
    'Feedback Received': string,
    'Notes to Yourself': string,
    'Custom Label': string,
    'Listed On': string,
    'Sold On': string,
    'Private Notes': string,
    'Product ID Type': string,
    'Product ID Value': string,
    'Product ID Value 2': string,
    'Variation Details': string,
    'Product Reference ID': string,
    'Tracking Number': string,
    'Phone': string
}

export interface NormalizedRecord {
    name: string;
    email: string;
    product: string;
    message: string;
}