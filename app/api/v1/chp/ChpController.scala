package api.v1.chp

import javax.inject.Inject
import play.api.Logger
import play.api.data.Form
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.json.{ JsValue, Json, Writes }
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

case class ChpFormInput(ident: String, c: Int, h: Int, p: Int)

object ChpFormInput {

  /**
    * Mapping to write a PostResource out as a JSON value.
    */
  implicit val implicitWrites = new Writes[ChpFormInput] {
    def writes(chp: ChpFormInput): JsValue = {
      Json.obj(
        "ident" -> chp.ident,
        "c" -> chp.c,
        "h" -> chp.h,
        "p" -> chp.p
      )
    }
  }
}

/**
  * Takes HTTP requests and produces JSON.
  */
class ChpController @Inject()(val messagesApi: MessagesApi) (implicit ec: ExecutionContext)
    extends Controller with I18nSupport {

  private var chps: List[ChpFormInput] = List()

  private val form: Form[ChpFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "ident" -> text,
        "c" -> number,
        "h" -> number,
        "p" -> number
      )(ChpFormInput.apply)(ChpFormInput.unapply)
    )
  }

  def index: Action[AnyContent] = Action.async {
    implicit request =>

    Future.successful(Ok(Json.toJson(chps)))
  }

  def rate: Action[AnyContent] = Action.async {
    implicit request =>
    Logger.debug("endpoint: rate")
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
      chps = input :: chps
      Future.successful(Ok(Json.toJson(chps)))
    }
    form.bindFromRequest().fold(failure, success)
  }
}
