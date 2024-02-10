// function to format the currency and style it according to your locale...

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}