
export function getDropdownHeadingAndDishes(dropdownHeading) {

    const dropdownHeadingAndDishes = [];

    dropdownHeading.forEach((heading) => {

        let headingCard = heading.card.card;
        if (headingCard.title) {
            let dropdownHeadingAndDish = {};
            dropdownHeadingAndDish.title = headingCard.title;
            dropdownHeadingAndDish.dishInfo = [];
            if (headingCard.categories) {

                headingCard.categories.forEach((category) => {

                    if (category.itemCards) {

                        category.itemCards.forEach((item) => {
                            if (item.card.info) {
                                dropdownHeadingAndDish.dishInfo.push(item.card.info);
                            }
                        })
                    }
                })
            }
            else if (headingCard.itemCards) {

                headingCard.itemCards.forEach((item) => {

                    if (item.card.info) {
                        dropdownHeadingAndDish.dishInfo.push(item.card.info);
                    }
                })
            }
            dropdownHeadingAndDishes.push(dropdownHeadingAndDish);

        }
    })

    return dropdownHeadingAndDishes;
}

export function addToCartBottomPopup(handleCartPopup, totalQuantity, totalAmount, viewCartImageLink, styles) {
    return <div className={styles.cartPopup}
        onClick={handleCartPopup}
        style={{ bottom: totalQuantity ? '0' : '-50px' }}>

        <div className={styles.totalCartItemsAndTotalCartPrice}>
            <div>{totalQuantity}{" "}Item</div>
            <div>|</div>
            <div>${totalAmount}</div>
        </div>
        <div className={styles.viewCart}>
            <div>View Cart</div>
            <div>
                <img src={viewCartImageLink} alt="" />
            </div>
        </div>
    </div>;
}