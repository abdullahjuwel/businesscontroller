import React from "react";
import { Link } from 'react-router-dom';

function Sidebar() {

  return (
    <nav className="pcoded-navbar">
      <div className="pcoded-inner-navbar main-menu">
        <div className="pcoded-navigatio-lavel">Navigation</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu active pcoded-trigger">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-home" />
              </span>
              <span className="pcoded-mtext">Dashboard</span>
            </a>
            <ul className="pcoded-submenu">
                <li>
                  <a href="/dashboard">
                    <span className="pcoded-mtext">Default</span>
                    <span className="pcoded-badge label label-info">NEW</span>
                  </a>
                </li>
            </ul>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Administration</div>
        <ul className="pcoded-item pcoded-left-item">
        {/* <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-sidebar" />
              </span>
              <span className="pcoded-mtext">Department</span>
              <span className="pcoded-badge label label-warning">NEW</span>
            </a>
            <ul className="pcoded-submenu">
            <Link to="/department">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Department List</span>
                </a>
              </li>
              </Link>
            </ul>
          </li> */}
          
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-box" />
              </span>
              <span className="pcoded-mtext">Sales Module</span>
              <span className="pcoded-badge label label-info">NEW</span>
            </a>
            <ul className="pcoded-submenu">
              <Link to="/product/sales/sales-entry">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Sales Entry</span>
                </a>
              </li>
              </Link>
              <Link to="/customer">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Customer Entry</span>
                </a>
              </li>
              </Link>
              <Link to="/product/sales/sales-return">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Sales Return</span>
                </a>
              </li>
              </Link>
              <Link to="/sales/sales-invoice">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Sales Invoice</span>
                </a>
              </li>
              </Link>
            </ul>
          </li>
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-gitlab" />
              </span>
              <span className="pcoded-mtext">Purchase Module</span>
            </a>
            <ul className="pcoded-submenu">
              <Link to="/product/purchase">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Purchase Entry</span>
                </a>
              </li>
              </Link>
              <Link to="/supplier">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Supplier Entry</span>
                </a>
              </li>
              </Link>
              <Link to="/product/purchase/return">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Purchase Return</span>
                </a>
              </li>
              </Link>
              <Link to="/product/purchase/record">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Purchase Record</span>
                </a>
              </li>
              </Link>
              <Link to="/purchase/supplier-ledger">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Supplier Ledger</span>
                </a>
              </li>
              </Link>
            </ul>
          </li>
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-package" />
              </span>
              <span className="pcoded-mtext">Administration</span>
              <span className="pcoded-badge label label-info">NEW</span>
            </a>
            <ul className="pcoded-submenu">
              <Link to="/product/categories">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Product Category</span>
                </a>
              </li>
              </Link>
              <Link to="/productname">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Product Name</span>
                </a>
              </li>
              </Link>
              <Link to="/productunit">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Product Unit</span>
                </a>
              </li>
              </Link>
              <Link to="/product">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Product Entry</span>
                </a>
              </li>
              </Link>
            </ul>
          </li>
          {/* <li>
            <a href="animation.html">
              <span className="pcoded-micon">
                <i className="feather icon-aperture rotate-refresh" />
                <b>A</b>
              </span>
              <span className="pcoded-mtext">Animations</span>
            </a>
          </li> */}
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
              <i className="feather icon-shopping-cart" />
              </span>
              <span className="pcoded-mtext">Inventory</span>
              <span className="pcoded-badge label label-danger">HOT</span>
            </a>
            <ul className="pcoded-submenu"> 
            <Link to="/inventory/product/stock">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Product Stock</span>
                </a>
              </li>
            </Link>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Typicons</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Flags</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Sales Module</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-clipboard" />
              </span>
              <span className="pcoded-mtext">Form Components</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Form Components</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Form-Elements-Add-On</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Form-Elements-Advance</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Form Validation</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="form-picker.html">
              <span className="pcoded-micon">
                <i className="feather icon-edit-1" />
              </span>
              <span className="pcoded-mtext">Form Picker</span>
              <span className="pcoded-badge label label-warning">NEW</span>
            </a>
          </li>
          <li>
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-feather" />
              </span>
              <span className="pcoded-mtext">Form Select</span>
            </a>
          </li>
          <li>
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-shield" />
              </span>
              <span className="pcoded-mtext">Form Masking</span>
            </a>
          </li>
          <li>
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-tv" />
              </span>
              <span className="pcoded-mtext">Form Wizard</span>
            </a>
          </li>
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-book" />
              </span>
              <span className="pcoded-mtext">Ready To Use</span>
              <span className="pcoded-badge label label-danger">HOT</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Cloned Elements Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Currency Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Booking Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Booking Multi Steps Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Comment Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Contact Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Job Application Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">JS Addition Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Login Form</span>
                </a>
              </li>
              <li>
                <a href="#!" target="_blank">
                  <span className="pcoded-mtext">Popup Modal Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Registration Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Review Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Subscribe Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Suggestion Form</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Tabs Form</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Tables</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-credit-card" />
              </span>
              <span className="pcoded-mtext">Bootstrap Table</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Basic Table</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Sizing Table</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Border Table</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Styling Table</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-inbox" />
              </span>
              <span className="pcoded-mtext">Data Table</span>
              <span className="pcoded-mcaret" />
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Basic Initialization</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Advance Initialization</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Styling</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">API</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Ajax</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Server Side</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Plug-In</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Data Sources</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-server" />
              </span>
              <span className="pcoded-mtext">Data Table Extensions</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">AutoFill</span>
                </a>
              </li>
              <li className="pcoded-hasmenu">
                <a href="#!">
                  <span className="pcoded-mtext">Button</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="#!">
                      <span className="pcoded-mtext">Basic Button</span>
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <span className="pcoded-mtext">Html-5 Data Export</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Col Reorder</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Fixed Columns</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Fixed Header</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Key Table</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Responsive</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Row Reorder</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Scroller</span>
                </a>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Select Table</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-hash" />
              </span>
              <span className="pcoded-mtext">FooTable</span>
            </a>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-airplay" />
              </span>
              <span className="pcoded-mtext">Handson Table</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="handson-appearance.html">
                  <span className="pcoded-mtext">Appearance</span>
                </a>
              </li>
              <li>
                <a href="handson-data-operation.html">
                  <span className="pcoded-mtext">Data Operation</span>
                </a>
              </li>
              <li>
                <a href="handson-rows-cols.html">
                  <span className="pcoded-mtext">Rows Columns</span>
                </a>
              </li>
              <li>
                <a href="handson-columns-only.html">
                  <span className="pcoded-mtext">Columns Only</span>
                </a>
              </li>
              <li>
                <a href="handson-cell-features.html">
                  <span className="pcoded-mtext">Cell Features</span>
                </a>
              </li>
              <li>
                <a href="handson-cell-types.html">
                  <span className="pcoded-mtext">Cell Types</span>
                </a>
              </li>
              <li>
                <a href="handson-integrations.html">
                  <span className="pcoded-mtext">Integrations</span>
                </a>
              </li>
              <li>
                <a href="handson-rows-only.html">
                  <span className="pcoded-mtext">Rows Only</span>
                </a>
              </li>
              <li>
                <a href="handson-utilities.html">
                  <span className="pcoded-mtext">Utilities</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="editable-table.html">
              <span className="pcoded-micon">
                <i className="feather icon-edit" />
              </span>
              <span className="pcoded-mtext">Editable Table</span>
            </a>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Chart And Maps</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-pie-chart" />
              </span>
              <span className="pcoded-mtext">Charts</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="chart-google.html">
                  <span className="pcoded-mtext">Google Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-echart.html">
                  <span className="pcoded-mtext">Echarts</span>
                </a>
              </li>
              <li>
                <a href="chart-chartjs.html">
                  <span className="pcoded-mtext">ChartJs</span>
                </a>
              </li>
              <li>
                <a href="chart-list.html">
                  <span className="pcoded-mtext">List Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-float.html">
                  <span className="pcoded-mtext">Float Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-knob.html">
                  <span className="pcoded-mtext">Knob chart</span>
                </a>
              </li>
              <li>
                <a href="chart-morris.html">
                  <span className="pcoded-mtext">Morris Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-nvd3.html">
                  <span className="pcoded-mtext">Nvd3 Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-peity.html">
                  <span className="pcoded-mtext">Peity Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-radial.html">
                  <span className="pcoded-mtext">Radial Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-rickshaw.html">
                  <span className="pcoded-mtext">Rickshaw Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-sparkline.html">
                  <span className="pcoded-mtext">Sparkline Chart</span>
                </a>
              </li>
              <li>
                <a href="chart-c3.html">
                  <span className="pcoded-mtext">C3 Chart</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-map" />
              </span>
              <span className="pcoded-mtext">Maps</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="map-google.html">
                  <span className="pcoded-mtext">Google Maps</span>
                </a>
              </li>
              <li>
                <a href="map-vector.html">
                  <span className="pcoded-mtext">Vector Maps</span>
                </a>
              </li>
              <li>
                <a href="map-api.html">
                  <span className="pcoded-mtext">Google Map Search API</span>
                </a>
              </li>
              <li>
                <a href="location.html">
                  <span className="pcoded-mtext">Location</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="files/extra-pages/landingpage/index.html" target="_blank">
              <span className="pcoded-micon">
                <i className="feather icon-navigation-2" />
              </span>
              <span className="pcoded-mtext">Landing Page</span>
            </a>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Pages</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-unlock" />
              </span>
              <span className="pcoded-mtext">Authentication</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="auth-normal-sign-in.html" target="_blank">
                  <span className="pcoded-mtext">Login With BG Image</span>
                </a>
              </li>
              <li>
                <a href="auth-sign-in-social.html" target="_blank">
                  <span className="pcoded-mtext">Login With Social Icon</span>
                </a>
              </li>
              <li>
                <a
                  href="auth-sign-in-social-header-footer.html"
                  target="_blank"
                >
                  <span className="pcoded-mtext">
                    Login Social With Header And Footer
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="auth-normal-sign-in-header-footer.html"
                  target="_blank"
                >
                  <span className="pcoded-mtext">
                    Login With Header And Footer
                  </span>
                </a>
              </li>
              <li>
                <a href="auth-sign-up.html" target="_blank">
                  <span className="pcoded-mtext">Registration BG Image</span>
                </a>
              </li>
              <li>
                <a href="auth-sign-up-social.html" target="_blank">
                  <span className="pcoded-mtext">Registration Social Icon</span>
                </a>
              </li>
              <li>
                <a
                  href="auth-sign-up-social-header-footer.html"
                  target="_blank"
                >
                  <span className="pcoded-mtext">
                    Registration Social With Header And Footer
                  </span>
                </a>
              </li>
              <li>
                <a href="auth-sign-up-header-footer.html" target="_blank">
                  <span className="pcoded-mtext">
                    Registration With Header And Footer
                  </span>
                </a>
              </li>
              <li>
                <a href="auth-multi-step-sign-up.html" target="_blank">
                  <span className="pcoded-mtext">Multi Step Registration</span>
                </a>
              </li>
              <li>
                <a href="auth-reset-password.html" target="_blank">
                  <span className="pcoded-mtext">Forgot Password</span>
                </a>
              </li>
              <li>
                <a href="auth-lock-screen.html" target="_blank">
                  <span className="pcoded-mtext">Lock Screen</span>
                </a>
              </li>
              <li>
                <a href="auth-modal.html" target="_blank">
                  <span className="pcoded-mtext">Modal</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-sliders" />
              </span>
              <span className="pcoded-mtext">Maintenance</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="error.html">
                  <span className="pcoded-mtext">Error</span>
                </a>
              </li>
              <li>
                <a href="comming-soon.html">
                  <span className="pcoded-mtext">Comming Soon</span>
                </a>
              </li>
              <li>
                <a href="offline-ui.html">
                  <span className="pcoded-mtext">Offline UI</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-users" />
              </span>
              <span className="pcoded-mtext">User Profile</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="timeline.html">
                  <span className="pcoded-mtext">Timeline</span>
                </a>
              </li>
              <li>
                <a href="timeline-social.html">
                  <span className="pcoded-mtext">Timeline Social</span>
                </a>
              </li>
              <li>
                <a href="user-profile.html">
                  <span className="pcoded-mtext">User Profile</span>
                </a>
              </li>
              <li>
                <a href="user-card.html">
                  <span className="pcoded-mtext">User Card</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-shopping-cart" />
              </span>
              <span className="pcoded-mtext">E-Commerce</span>
              <span className="pcoded-badge label label-danger">NEW</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="product.html">
                  <span className="pcoded-mtext">Product</span>
                </a>
              </li>
              <li>
                <a href="product-list.html">
                  <span className="pcoded-mtext">Product List</span>
                </a>
              </li>
              <li>
                <a href="product-edit.html">
                  <span className="pcoded-mtext">Product Edit</span>
                </a>
              </li>
              <li>
                <a href="product-detail.html">
                  <span className="pcoded-mtext">Product Detail</span>
                </a>
              </li>
              <li>
                <a href="product-cart.html">
                  <span className="pcoded-mtext">Product Card</span>
                </a>
              </li>
              <li>
                <a href="product-payment.html">
                  <span className="pcoded-mtext">Credit Card Form</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-mail" />
              </span>
              <span className="pcoded-mtext">Email</span>
            </a>
            <ul className="pcoded-submenu">
              <li className>
                <a href="email-compose.html">
                  <span className="pcoded-mtext">Compose Email</span>
                </a>
              </li>
              <li>
                <a href="email-inbox.html">
                  <span className="pcoded-mtext">Inbox</span>
                </a>
              </li>
              <li>
                <a href="email-read.html">
                  <span className="pcoded-mtext">Read Mail</span>
                </a>
              </li>
              <li className="pcoded-hasmenu ">
                <a href="a">
                  <span className="pcoded-mtext">Email Template</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="/files/extra-pages/email-templates/email-welcome.html">
                      <span className="pcoded-mtext">Welcome Email</span>
                    </a>
                  </li>
                  <li>
                    <a href="/files/extra-pages/email-templates/email-password.html">
                      <span className="pcoded-mtext">Reset Password</span>
                    </a>
                  </li>
                  <li>
                    <a href="/files/extra-pages/email-templates/email-newsletter.html">
                      <span className="pcoded-mtext">Newsletter Email</span>
                    </a>
                  </li>
                  <li>
                    <a href="/files/extra-pages/email-templates/email-launch.html">
                      <span className="pcoded-mtext">App Launch</span>
                    </a>
                  </li>
                  <li>
                    <a href="/files/extra-pages/email-templates/email-activation.html">
                      <span className="pcoded-mtext">Activation Code</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">App</div>
        <ul className="pcoded-item pcoded-left-item">
          <li>
            <a href="chat.html">
              <span className="pcoded-micon">
                <i className="feather icon-message-square" />
              </span>
              <span className="pcoded-mtext">Chat</span>
            </a>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-globe" />
              </span>
              <span className="pcoded-mtext">Social</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="fb-wall.html">
                  <span className="pcoded-mtext">Wall</span>
                </a>
              </li>
              <li>
                <a href="message.html">
                  <span className="pcoded-mtext">Messages</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="s">
              <span className="pcoded-micon">
                <i className="feather icon-check-circle" />
              </span>
              <span className="pcoded-mtext">Task</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="task-list.html">
                  <span className="pcoded-mtext">Task List</span>
                </a>
              </li>
              <li>
                <a href="task-board.html">
                  <span className="pcoded-mtext">Task Board</span>
                </a>
              </li>
              <li>
                <a href="task-detail.html">
                  <span className="pcoded-mtext">Task Detail</span>
                </a>
              </li>
              <li>
                <a href="issue-list.html">
                  <span className="pcoded-mtext">Issue List</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="a">
              <span className="pcoded-micon">
                <i className="feather icon-bookmark" />
              </span>
              <span className="pcoded-mtext">To-Do</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="todo.html">
                  <span className="pcoded-mtext">To-Do</span>
                </a>
              </li>
              <li>
                <a href="notes.html">
                  <span className="pcoded-mtext">Notes</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-image" />
              </span>
              <span className="pcoded-mtext">Gallery</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="gallery-grid.html">
                  <span className="pcoded-mtext">Gallery-Grid</span>
                </a>
              </li>
              <li>
                <a href="gallery-masonry.html">
                  <span className="pcoded-mtext">Masonry Gallery</span>
                </a>
              </li>
              <li>
                <a href="gallery-advance.html">
                  <span className="pcoded-mtext">Advance Gallery</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-search" />
                <b>S</b>
              </span>
              <span className="pcoded-mtext">Search</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="search-result.html">
                  <span className="pcoded-mtext">Simple Search</span>
                </a>
              </li>
              <li>
                <a href="search-result2.html">
                  <span className="pcoded-mtext">Grouping Search</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-award" />
              </span>
              <span className="pcoded-mtext">Job Search</span>
              <span className="pcoded-badge label label-danger">NEW</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="job-card-view.html">
                  <span className="pcoded-mtext">Card View</span>
                </a>
              </li>
              <li>
                <a href="job-details.html">
                  <span className="pcoded-mtext">Job Detailed</span>
                </a>
              </li>
              <li>
                <a href="job-find.html">
                  <span className="pcoded-mtext">Job Find</span>
                </a>
              </li>
              <li>
                <a href="job-panel-view.html">
                  <span className="pcoded-mtext">Job Panel View</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Extension</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-file-plus" />
              </span>
              <span className="pcoded-mtext">Editor</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="ck-editor.html">
                  <span className="pcoded-mtext">CK-Editor</span>
                </a>
              </li>
              <li>
                <a href="wysiwyg-editor.html">
                  <span className="pcoded-mtext">WYSIWYG Editor</span>
                </a>
              </li>
              <li>
                <a href="ace-editor.html">
                  <span className="pcoded-mtext">Ace Editor</span>
                </a>
              </li>
              <li>
                <a href="long-press-editor.html">
                  <span className="pcoded-mtext">Long Press Editor</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-file-minus" />
              </span>
              <span className="pcoded-mtext">Invoice</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="invoice.html">
                  <span className="pcoded-mtext">Invoice</span>
                </a>
              </li>
              <li>
                <a href="invoice-summary.html">
                  <span className="pcoded-mtext">Invoice Summary</span>
                </a>
              </li>
              <li>
                <a href="invoice-list.html">
                  <span className="pcoded-mtext">Invoice List</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-calendar" />
              </span>
              <span className="pcoded-mtext">Event Calendar</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="event-full-calender.html">
                  <span className="pcoded-mtext">Full Calendar</span>
                </a>
              </li>
              <li>
                <a href="event-clndr.html">
                  <span className="pcoded-mtext">CLNDER</span>
                  <span className="pcoded-badge label label-info">NEW</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="image-crop.html">
              <span className="pcoded-micon">
                <i className="feather icon-scissors" />
              </span>
              <span className="pcoded-mtext">Image Cropper</span>
            </a>
          </li>
          <li>
            <a href="file-upload.html">
              <span className="pcoded-micon">
                <i className="feather icon-upload-cloud" />
              </span>
              <span className="pcoded-mtext">File Upload</span>
            </a>
          </li>
          <li>
            <a href="change-loges.html">
              <span className="pcoded-micon">
                <i className="feather icon-briefcase" />
                <b>CL</b>
              </span>
              <span className="pcoded-mtext">Change Loges</span>
            </a>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Other</div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu ">
            <a href="#!">
              <span className="pcoded-micon">
                <i className="feather icon-list" />
              </span>
              <span className="pcoded-mtext">Menu Levels</span>
            </a>
            <ul className="pcoded-submenu">
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Menu Level 2.1</span>
                </a>
              </li>
              <li className="pcoded-hasmenu ">
                <a href="#!">
                  <span className="pcoded-mtext">Menu Level 2.2</span>
                </a>
                <ul className="pcoded-submenu">
                  <li>
                    <a href="#!">
                      <span className="pcoded-mtext">Menu Level 3.1</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#!">
                  <span className="pcoded-mtext">Menu Level 2.3</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#!" className="disabled">
              <span className="pcoded-micon">
                <i className="feather icon-power" />
              </span>
              <span className="pcoded-mtext">Disabled Menu</span>
            </a>
          </li>
          <li>
            <a href="sample-page.html">
              <span className="pcoded-micon">
                <i className="feather icon-watch" />
              </span>
              <span className="pcoded-mtext">Sample Page</span>
            </a>
          </li>
        </ul>
        <div className="pcoded-navigatio-lavel">Support</div>
        <ul className="pcoded-item pcoded-left-item">
          <li>
            <a href="http://html.codedthemes.com/Adminty/doc">
              <span className="pcoded-micon">
                <i className="feather icon-monitor" />
              </span>
              <span className="pcoded-mtext">Documentation</span>
            </a>
          </li>
          <li>
            <a href="#!" target="_blank">
              <span className="pcoded-micon">
                <i className="feather icon-help-circle" />
              </span>
              <span className="pcoded-mtext">Submit Issue</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
