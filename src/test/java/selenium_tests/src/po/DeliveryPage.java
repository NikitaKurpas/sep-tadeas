package selenium_tests.src.po;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeliveryPage {

  private final WebDriver driver;
  private final WebDriverWait wait;


  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/a")
  private WebElement signOutButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/span")
  private WebElement userLabel;

  @FindBy(xpath = "//*[@id=\"file\"]")
  private WebElement chooseFileButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]")
  private WebElement taskDetail;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div/button")
  private WebElement confirmButton;


  public DeliveryPage(final WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);
    this.wait = new WebDriverWait(driver, 30);
  }

  public void goTo() {
    this.driver.get("http://localhost:3000/task");
  }

  public void signOut() {
    this.signOutButton.click();
  }

  public WebElement getTaskDetail() {
    return taskDetail;
  }

}
