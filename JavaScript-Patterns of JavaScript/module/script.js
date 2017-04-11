(() => {
  const Shop = (() => {

    let basket = [];

    function addToBasket(item) {
      item.total = item.price * item.number;
      var exists = false;
      for(let i = 0; i < basket.length; i++) {
        if(basket[i].id == item.id) {
          exists = true;
          basket[i].number += item.number;
          basket[i].total += item.total;
        }
      }

      if(exists == false) {
        basket.push(item);
      }
    }

    function deleteFromBasket(id) {
      var toDelete;
      basket.forEach((item, i) => {
        if(item.id == id) {
          toDelete = i;
        }
      });
      basket.splice(toDelete, 1);
    }

    return {

      addItem(item) {
        addToBasket(item);
      },

      deleteItem(id) {
        deleteFromBasket(id);
      },

      getItemCount() {
        return basket.length;
      },

      getTotal() {

        let q = this.getItemCount();
        let p = 0;

        while (q--) {
          p += basket[q].total;
        }

        return p;
      },

      renderBasket() {

        const cart = document.querySelector('#cart');
        cart.innerHTML = '';

        basket.forEach(function(item) {

          const basketRow = document.createElement('div');
          basketRow.className = 'basket-row';

          const itemTitle = document.createElement('span');
          itemTitle.className = 'basket-title';
          itemTitle.innerHTML = item.title;
          basketRow.appendChild(itemTitle);

          const itemCount = document.createElement('span');
          itemCount.className = 'basket-number';
          itemCount.innerHTML = item.number;
          basketRow.appendChild(itemCount);

          const itemPrice = document.createElement('span');
          itemPrice.className = 'basket-price';
          itemPrice.innerHTML = item.total;
          basketRow.appendChild(itemPrice);

          const itemDelete = document.createElement('span');
          itemDelete.className = 'basket-delete';
          itemDelete.id = item.id;
          itemDelete.innerHTML = 'x';
          itemDelete.addEventListener('click', function() {
            Shop.deleteItem(+this.id);
            Shop.renderBasket();
          });
          basketRow.appendChild(itemDelete);

          cart.appendChild(basketRow);

        });

        const basketTotal = document.createElement('div');
        basketTotal.className = 'basket-total';
        basketTotal.innerHTML = 'Total:' + this.getTotal();
        cart.appendChild(basketTotal);
      }

    };
  })();

  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const itemNodes = this.parentNode.childNodes;
      const item = {
        id: this.parentNode.id,
        title: itemNodes[1].innerHTML,
        price: +itemNodes[3].innerHTML,
        number: +itemNodes[5].value
      };
      Shop.addItem(item);
      Shop.renderBasket();
    });
  });


})();