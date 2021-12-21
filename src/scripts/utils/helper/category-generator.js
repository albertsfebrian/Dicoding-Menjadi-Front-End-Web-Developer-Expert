export const categoryStringGenerator = (categories, separator = ',') => {
  const categoriesArray = categories.map(category => category.name)
  return categoriesArray.join(separator)
}
