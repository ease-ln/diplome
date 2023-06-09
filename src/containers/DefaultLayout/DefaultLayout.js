import React, {Component, Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Container} from 'reactstrap'
import {fromJS} from 'immutable'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav'
// routes config
import routes from '../../routes'

// redux
import {connect} from 'react-redux'
import {loggedIn} from '../../redux/auth/selectors'
import {logout} from '../../redux/common/flows'

const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

const objectWithoutKey = (object, key) => {
  const {[key]: _, ...otherKeys} = object
  return otherKeys
}

const restricted = (nav, allowedRoutes) => {
  let newNav = {...nav}

  const allowedPages = allowedRoutes.map((x) => x.page)

  newNav.items = nav.items.filter(
    (x) => x.variant || allowedPages.includes(x.url),
  )

  return newNav
}

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  )

  signOut(e) {
    e.preventDefault()
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {

    if (!this.props.auth.loggedIn) {
      this.props.history.push('/login')
    }

    const displayPages = this.props.pages.concat([
      {page: '/agentMenu', icon: 'null'},
      {page: '/company', icon: 'null'},
      {page: '/control', icon: 'null'},
      {page: 'gqm', icon: 'null'},
    ])

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar 
          fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={restricted(navigation, displayPages)}
                {...objectWithoutKey(
                  objectWithoutKey(this.props, 'loggedIn'),
                  'logout',
                )}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={route.name}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <route.component
                            {...objectWithoutKey(props, 'loggedIn')}
                          />
                        )}
                      />
                    ) : null
                  })}
                  <Redirect to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loggedIn: loggedIn(state),
    auth: state.auth.toJS(),
    pages: fromJS(state.roles.get('pages')).toJS(),
  }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
  }),
)(DefaultLayout)