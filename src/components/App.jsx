import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactItem from './ContactItem/ContactItem';
import Filter from './Filter/Filter';

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  fontSize: 25,
  color: '#3d2f26ed',
  marginLeft: '30px',
};
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;
    contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
    console.log(contacts);
  };
  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <div style={mainStyle}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h3>Contacts</h3>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList>
          <ContactItem
            contacts={visibleContact}
            deleteContactOn={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}

export default App;
