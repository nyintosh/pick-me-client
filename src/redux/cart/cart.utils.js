export const AddItemsToCart = (items, itemToAdd) => {
	const existingItem = items.find((item) => item.id === itemToAdd.id)

	if (existingItem) {
		return items.map((item) => (item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item))
	}
	return [...items, { ...itemToAdd, quantity: 1 }]
}

export const ReduceItemFromCart = (items, itemToReduce) => {
	const existingItem = items.find((item) => item.id === itemToReduce.id)

	if (existingItem.quantity === 1) {
		return items.filter((item) => item.id !== itemToReduce.id)
	}
	return items.map((item) => (item.id === itemToReduce.id ? { ...item, quantity: item.quantity - 1 } : item))
}
