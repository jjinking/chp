package api.v1.chp

import javax.inject.Inject
import play.api.data.Form
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

case class ChpFormInput(c: Int, h: Int, p: Int)

/**
  * Takes HTTP requests and produces JSON.
  */
class ChpController @Inject()(val messagesApi: MessagesApi) (implicit ec: ExecutionContext)
    extends Controller with I18nSupport {

  private val form: Form[ChpFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "c" -> number,
        "h" -> number,
        "p" -> number
      )(ChpFormInput.apply)(ChpFormInput.unapply)
    )
  }

  def index: Action[AnyContent] = Action.async {
    implicit request =>

    // handler.find.map { posts =>
    //   Ok(Json.toJson(posts))
    // }
    Future.successful(Ok("Hello World"))
  }

  def rate: Action[AnyContent] = Action.async {
    implicit request =>

    processJsonPost()
  }

  // def show(id: String): Action[AnyContent] = {
  //   action.async { implicit request =>
  //     handler.lookup(id).map { post =>
  //       Ok(Json.toJson(post))
  //     }
  //   }
  // }

  private def processJsonPost[A]()(
    implicit request: Request[A]): Future[Result] = {

    def failure(badForm: Form[ChpFormInput]) = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: ChpFormInput) = {
      // handler.create(input).map { post =>
      //   Created(Json.toJson(post)).withHeaders(LOCATION -> post.link)
      // }
      println("success!")
      println(input)
      Future.successful(Ok("success!"))
    }

    form.bindFromRequest().fold(failure, success)
  }
}
