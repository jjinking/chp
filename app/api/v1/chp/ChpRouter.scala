package api.v1.chp

import javax.inject.Inject

import play.api.routing.Router.Routes
import play.api.routing.SimpleRouter
import play.api.routing.sird._

/**
  * Routes and URLs to the PostResource controller.
  */
class ChpRouter @Inject()(controller: ChpController) extends SimpleRouter {
  val prefix = "/api/v1/chp"

  override def routes: Routes = {
    case GET(p"/") =>
      controller.index

    case POST(p"/") =>
      controller.rate

    // case GET(p"/$id") =>
    //   controller.show(id)
  }

}
