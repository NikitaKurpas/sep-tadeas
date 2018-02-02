package selenium_tests.src.po;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeliveryTeacherPage extends DeliveryPage {

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div[1]")
  private WebElement isTaskCompletedFrame;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div/button")
  private WebElement evaluateButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div[1]/button[1]")
  private WebElement setCompletedYes;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/div[1]/button[2]")
  private WebElement setCompletedNo;

  public DeliveryTeacherPage(WebDriver driver) {
    super(driver);
  }


  public void goTo() {
    this.driver.get("http://localhost:3000/task");
  }

  public void logOut() {
    //    this.logOutButton.click(); // TODO! change to sign out when working
    driver.findElements(By.xpath("//body")).
      get(0).sendKeys(Keys.chord(Keys.COMMAND, "R"));
  }

  public boolean canBeEvaluated() {
    return isTaskCompletedFrame.isDisplayed();
  }

  public void setCompleted(boolean completed) {
    if (completed) {
      setCompletedYes.click();
    }
    else {
      setCompletedNo.click();
    }
    evaluateButton.click();
  }

}
