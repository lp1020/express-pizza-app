document.addEventListener('DOMContentLoaded', () => {
  const pageState = {
    initialized: false,
    currentPage: 'home',
    currentPizza: null,
    singlePizzaData: {
      flavor: null,
      description: null,
      location: null,
    },
    $container: null,
  };

  // ====== this is extremely bad practice, please never do it
  const formStrings = () => {
    return ({
    add: `<form class='addform'>
      <input type='text' placeholder='flavor' name='flavor' />
      <input type='text' placeholder='description' name='description' />
      <input type='text' placeholder='location' name='location' />
      <input type='submit' value='Add it!' />
    </form>`,
    edit: `<form class='editform'>
      <input type='text' placeholder='flavor' name='flavor' value=${pageState.singlePizzaData.flavor} />
      <input type='text' placeholder='description' name='description' value='${pageState.singlePizzaData.description}' />
      <input type='text' placeholder='location' name='location' value=${pageState.singlePizzaData.location} />
      <input type='submit' value='Edit it!' />
    </form>`
    });
  };

  function updatePage() {
    if (!pageState.initialized) {
      pageState.$container = $('.container');
      $('.home').on('click', () => {
        pageState.currentPage = 'home';
        updatePage();
      });
      $('.new').on('click', () => {
        pageState.currentPage = 'new';
        updatePage();
      });
      pageState.initialized = true;
    }
    pageState.$container.html('');
    switch(pageState.currentPage) {
      case 'home':
        getAllPizza();
        break;
      case 'show':
        getSinglePizza(pageState.currentPizza);
        break;
      case 'new':
        addPizzaForm();
        break;
      case 'edit':
        editPizzaForm(pageState.currentPizza);
        break;
      default:
        break;
    }
  }

  // ============= HOME STATE
  function getAllPizza() {
    console.log('making call');
    $.ajax({
      url: '/pizza',
      method: 'GET',
      success: (res) => attachPizzaToPage(res),
    });
  }

  function attachPizzaToPage(res) {
    console.log('attaching');
    res.data.forEach((pizza) => {
      const $pizzaName = $('<h3>').html(pizza.flavor);
      pageState.$container.append($('<div>').append($pizzaName).addClass('pizza').on('click', () => goToPizzaInfo(pizza.id)));
    });
  }

  // =============== SHOW STATE
  function goToPizzaInfo(id) {
    pageState.currentPage = 'show';
    pageState.currentPizza = id;
    updatePage();
  }

  function getSinglePizza(id) {
    $.ajax({
      url: `/pizza/${id}`,
      method: 'GET',
      success: (res) => showSinglePizza(res),
    })
  }

  function showSinglePizza(res) {
    pageState.singlePizzaData = res.data;
    const $pizzaDiv = $('<div>').addClass('pizza-info');
    $pizzaDiv.append($('<h3>').html(res.data.flavor));
    $pizzaDiv.append($('<p>').html(res.data.description));
    $pizzaDiv.append($('<span>').addClass('location').html(res.data.location));
    const $buttonDiv = $('<div>').addClass('button-container');
    $buttonDiv.append($('<span>').html('DELETE').addClass('pizza-button').on('click', () => deletePizza(res.data.id)));
    $buttonDiv.append($('<span>').html('EDIT').addClass('pizza-button').on('click', () => {
      pageState.currentPage = 'edit';
      updatePage();
    }));
    $pizzaDiv.append($buttonDiv);
    pageState.$container.append($pizzaDiv);
  }

  // ============ DELETE
  function deletePizza(id) {
    $.ajax({
      url: `/pizza/${id}`,
      method: 'DELETE',
      success: (res) => {
        console.log(res);
        pageState.currentPage = 'home';
        updatePage();
      }
    })
  }

  // =============== EDIT
  function editPizzaForm(id) {
    pageState.$container.append($('<div>').html(formStrings().edit));
    $('.editform').on('submit', (e) => submitEditFormData(e, id));
  }

  function submitEditFormData(e, id) {
    e.preventDefault();
    $.ajax({
      url: `/pizza/${id}`,
      method: 'PUT',
      data: {
        flavor: e.target.flavor.value,
        description: e.target.description.value,
        location: e.target.location.value,
      },
      success: (res) => {
        console.log(res);
        pageState.currentPage = 'show';
        updatePage();
      }
    })
  }

  // ============= ADD
  function addPizzaForm() {
    pageState.$container.append($('<div>').html(formStrings().add));
    $('.addform').on('submit', (e) => submitAddFormData(e));
  }

  function submitAddFormData(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/pizza',
      data: {
        flavor: e.target.flavor.value,
        description: e.target.description.value,
        location: e.target.location.value,
      },
      success: (res) => {
        console.log(res);
        pageState.currentPage = 'home';
        updatePage();
      } 
    })
  }

  updatePage();
});

