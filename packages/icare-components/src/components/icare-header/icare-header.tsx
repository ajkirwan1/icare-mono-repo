import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'icare-header',
  styleUrl: 'icare-header.scss',
  shadow: true,
})
export class IcareHeader {
  @Prop() loggedIn = false;


  render() {
    return (
      <Host>
         <header>
          <div>
            <icare-logo />
          </div>
          <nav>
          <ul>
            <li><a href="/who-we-are">Who We Are</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/icare-for-caregivers">ICare for Caregivers</a></li>
            <li><a href="/icare-for-carereceivers">ICare for Carereceivers</a></li>
            {this.loggedIn ? <> <icare-button>Logout</icare-button>
             </> :  <div class="button-wrapper"><icare-button>Login</icare-button>
              <icare-button>Register</icare-button></div>}
              </ul>
              </nav>
         </header>
      </Host>
    );
  }
}
