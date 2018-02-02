package selenium_tests.src.po;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeliveryStudentPage extends DeliveryPage {

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div/button")
  private WebElement confirmButton;

  @FindBy(xpath = "//*[@id=\"file\"]")
  private WebElement chooseFileButton;

  public DeliveryStudentPage(WebDriver driver) {
    super(driver);
  }

}
