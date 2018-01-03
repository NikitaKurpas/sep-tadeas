package po;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class LoginPage {
  private final WebDriver driver;
  private final WebDriverWait wait;

  @FindBy(id = "email")
  private WebElement emailInput;

  @FindBy(id = "password")
  private WebElement passwordInput;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/form/button[1]")
  private WebElement signInButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/form/button[2]")
  private WebElement resetButton;

  @FindBy(className = "table")
  private WebElement tasksTable;

  public LoginPage(final WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);
    this.wait = new WebDriverWait(driver, 30);
  }

  public void goTo() {
    this.driver.get("http://localhost:3000/login");
  }

  public void login(String email, String password) throws InterruptedException {
    this.emailInput.sendKeys(email);
    this.passwordInput.sendKeys(password);
    wait.until(ExpectedConditions.elementToBeClickable(this.signInButton));
    this.signInButton.click();
  }

  public WebElement getTable() {
    return this.tasksTable;
  }

}
