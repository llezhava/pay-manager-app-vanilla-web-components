const {
    format
} = require('date-fns')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

function getFilters(filters) {
    let fromAmount = isValid(filters.fromAmount) ? {
            amount: {
                [Op.gte]: Number(filters.fromAmount)
            }
        } :
        undefined

    let toAmount = isValid(filters.toAmount) ? {
            amount: {
                [Op.lte]: Number(filters.toAmount)
            }
        } :
        undefined

    let fromDate = isValid(filters.fromDate) ? {
            date: {
                [Op.gte]: format(filters.fromDate, ['YYYY-MM-DD'])
            }
        } :
        undefined

    let toDate = isValid(filters.toDate) ? {
            date: {
                [Op.lte]: format(filters.toDate, ['YYYY-MM-DD'])
            }
        } :
        undefined

    let categories = getCategories(filters.categories)

    let any = getAny(filters.any)


    let andFilters = [fromAmount, toAmount, fromDate, toDate, categories, any].filter(i => i !== undefined)

    return {[Op.and]: andFilters}
}

function getAny(any) {
    if (isValid(any)) {
        return {
            [Op.or]: [
                isValid(Number(any)) ? {
                    amount: any
                } : undefined,
                {
                    title: {
                       [Op.like]: `%${any}%`
                    }
                },
                {
                    comment: {
                        [Op.like]: `%${any}%`
                    }
                }
            ].filter(i => i !== undefined)
        }
    } else {
        return undefined
    }
}

function getCategories(list) {
    if (Array.isArray(list) && list.length > 0) {
        return {
            categoryId: {
                [Op.or]: list
            }
        }
    } else {
        return undefined
    }
}

function isValid(val) {
    return val !== null && val !== undefined && val !== ""
}


module.exports = getFilters