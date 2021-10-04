import React from 'react'

function Dashboard() {
    return (
        <div className="row">
  <div className="col-xl-3 col-md-6">
    <div className="card bg-c-yellow text-white">
      <div className="card-block">
        <div className="row align-items-center">
          <div className="col">
            <p className="m-b-5">New Customer</p>
            <h4 className="m-b-0">852</h4>
          </div>
          <div className="col col-auto text-right">
            <i className="feather icon-user f-50 text-c-yellow" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6">
    <div className="card bg-c-green text-white">
      <div className="card-block">
        <div className="row align-items-center">
          <div className="col">
            <p className="m-b-5">Income</p>
            <h4 className="m-b-0">$5,852</h4>
          </div>
          <div className="col col-auto text-right">
            <i className="feather icon-credit-card f-50 text-c-green" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6">
    <div className="card bg-c-pink text-white">
      <div className="card-block">
        <div className="row align-items-center">
          <div className="col">
            <p className="m-b-5">Ticket</p>
            <h4 className="m-b-0">42</h4>
          </div>
          <div className="col col-auto text-right">
            <i className="feather icon-book f-50 text-c-pink" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6">
    <div className="card bg-c-blue text-white">
      <div className="card-block">
        <div className="row align-items-center">
          <div className="col">
            <p className="m-b-5">Orders</p>
            <h4 className="m-b-0">$5,242</h4>
          </div>
          <div className="col col-auto text-right">
            <i className="feather icon-shopping-cart f-50 text-c-blue" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* statustic-card start */}
  {/* statustic-card start */}
  <div className="col-xl-8 col-md-12">
    <div className="card">
      <div className="card-header">
        <div className="card-header-left ">
          <h5>Monthly View</h5>
          <span className="text-muted">For more details about usage,
            please refer <a href="#!">amCharts</a> licences.</span>
        </div>
      </div>
      <div className="card-block-big">
        <div id="monthly-graph" style={{height: 250}} />
      </div>
    </div>
  </div>
  <div className="col-xl-4 col-md-12">
    <div className="card feed-card">
      <div className="card-header">
        <h5>Feeds</h5>
      </div>
      <div className="card-block">
        <div className="row m-b-30">
          <div className="col-auto p-r-0">
            <i className="feather icon-bell bg-simple-c-blue feed-icon" />
          </div>
          <div className="col">
            <h6 className="m-b-5">You have 3 pending tasks. <span className="text-muted f-right f-13">Just Now</span>
            </h6>
          </div>
        </div>
        <div className="row m-b-30">
          <div className="col-auto p-r-0">
            <i className="feather icon-shopping-cart bg-simple-c-pink feed-icon" />
          </div>
          <div className="col">
            <h6 className="m-b-5">New order received <span className="text-muted f-right f-13">Just Now</span>
            </h6>
          </div>
        </div>
        <div className="row m-b-30">
          <div className="col-auto p-r-0">
            <i className="feather icon-file-text bg-simple-c-green feed-icon" />
          </div>
          <div className="col">
            <h6 className="m-b-5">You have 3 pending tasks. <span className="text-muted f-right f-13">Just Now</span>
            </h6>
          </div>
        </div>
        <div className="row m-b-30">
          <div className="col-auto p-r-0">
            <i className="feather icon-shopping-cart bg-simple-c-pink feed-icon" />
          </div>
          <div className="col">
            <h6 className="m-b-5">New order received <span className="text-muted f-right f-13">Just Now</span>
            </h6>
          </div>
        </div>
        <div className="row m-b-30">
          <div className="col-auto p-r-0">
            <i className="feather icon-file-text bg-simple-c-green feed-icon" />
          </div>
          <div className="col">
            <h6 className="m-b-5">You have 3 pending tasks. <span className="text-muted f-right f-13">Just Now</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* statustic-card start */}
  {/* latest activity end */}

</div>

    )
}

export default Dashboard
