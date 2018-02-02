package selenium_tests.src.po;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TaskListPage {

  private final WebDriver driver;
  private final WebDriverWait wait;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/table")
  private WebElement taskList;

  @FindBy(xpath = "//*[@id=\"root\"]/div/div/form/input")
  private WebElement searchTasks;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/a")
  private WebElement logOutButton;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/span")
  private WebElement userLabel;

  @FindBy(xpath = "//*[@id=\"root\"]/div/nav/div/div/ul/li/a")
  private WebElement taskListButton;

  public TaskListPage(final WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);
    this.wait = new WebDriverWait(driver, 30);
  }

  public void goTo() {
    this.driver.get("http://localhost:3000/task");
  }

  public void logOut() {
    //    this.logOutButton.click(); // TODO! change to sign out when working
    driver.findElements(By.xpath("//body")).
      get(0).sendKeys(Keys.chord(Keys.COMMAND, "R"));
  }

  public void openDelivery(int number) {
    WebElement delivery = this.driver.findElement(By.xpath(
      "//*[@id=\"root\"]/div/div/table/tbody/tr[" + number + "]/td[" + number + "]"));
    delivery.click();
  }

  public void goToTasks() {
    taskListButton.click();
  }

  public WebElement getTaskList() {
    return taskList;
  }

  public boolean containsTask(int id, String strName, String issuer, String strIssuedate, boolean active) {
//    System.out.println("EXPECTED: " + strName + issuer + strIssuedate + active);
//    System.out.println("ACTUAL: " +
//    this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[1]")).get(0).getText()
//      + (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[2]")).get(0).getText())
//      + (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[3]")).get(0).getText())
//      + (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[4]/input")).get(0).isSelected())
//    );
    if (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[1]")).get(0).getText().equals(strName)
      && (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[2]")).get(0).getText().equals(issuer))
      && (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[3]")).get(0).getText().equals(strIssuedate))
      && (this.taskList.findElements(By.xpath("//*[@id=\"root\"]/div/div/table/tbody/tr["+id+"]/td[4]/input")).get(0).isSelected() == active)
      ) {
      return true;
    }
    return false;
  }
}
