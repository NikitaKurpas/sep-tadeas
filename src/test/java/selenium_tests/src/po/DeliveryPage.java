package selenium_tests.src.po;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeliveryPage {

  final WebDriver driver;
  final WebDriverWait wait;


  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/a")
  WebElement logOutButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/span")
  WebElement userLabel;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/div/ul/li/a")
  WebElement tasksListButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]")
  WebElement taskDetail;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/h2")
  WebElement taskName;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/h4")
  WebElement issuer;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/h6")
  WebElement issueDate;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/h6[2]")
  WebElement startDate;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[1]/h6[3]")
  WebElement deadlineDate;

//  WebElement active;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/div/div[2]")
  WebElement detail;

  public DeliveryPage(final WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);
    this.wait = new WebDriverWait(driver, 30);
  }

  public void logOut() {
    //    this.logOutButton.click(); // TODO! change to sign out when working
    driver.findElements(By.xpath("//body")).
      get(0).sendKeys(Keys.chord(Keys.COMMAND, "R"));
  }

  public WebElement getTaskDetail() {
    return taskDetail;
  }

  public boolean containsDetail(int i, String strName, String strIssuer, String strIssuedate,
                                String strStartdate, String strDeadlinedate, boolean active, String strDetail) {
    String actualIsssuer = this.issuer.getText();
    actualIsssuer = actualIsssuer.substring("By ".length());

    String actualIssueDate = this.issueDate.getText();
    actualIssueDate = actualIssueDate.substring("Issue date: ".length());

    String actualStartDate = this.startDate.getText();
    actualStartDate = actualStartDate.substring("Start date: ".length());

    String actualDeadlineDate = this.deadlineDate.getText();
    actualDeadlineDate = actualDeadlineDate.substring("Deadline date: ".length());

    String actualDetail = this.detail.getText();

    System.out.println("" + actualIsssuer + " " + actualIssueDate + " " + actualStartDate
      + " " + actualDeadlineDate + " " + actualDetail);

    if (this.taskName.getText().equals(strName)
      && actualIsssuer.equals(strIssuer)
      && actualIssueDate.equals(strIssuedate)
      && actualStartDate.equals(strStartdate)
      && actualDeadlineDate.equals(strDeadlinedate)
      && actualDetail.equals(strDetail)
      ) {
      return true;
    }
    return false;
  }

  public void goToTaskList() {
    tasksListButton.click();
  }
}
