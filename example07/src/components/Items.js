import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = {
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template() {
    const {items} = this.$state;
    return `
      <ul>
        ${items.map(({contents, active, seq}) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
    `
  }

  setEvent() {
    this.addEvent('click', '.addBtn', ({target}) => {
      const {items} = this.$state;
      const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
      const contents = `item${seq}`;
      const active = false;
      this.setState({
        items: [
          ...items,
          {seq, contents, active}
        ]
      });
    });

    this.addEvent('click', '.deleteBtn', ({target}) => {
      const items = [ ...this.$state.items ];;
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      items.splice(items.findIndex(v => v.seq === seq), 1);
      this.setState({items});
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      const items = [ ...this.$state.items ];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const index = items.findIndex(v => v.seq === seq);
      items[index].active = !items[index].active;
      this.setState({items});
    });
  }
}

