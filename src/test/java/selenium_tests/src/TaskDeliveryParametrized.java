package selenium_tests.src;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.DeliveryStudentPage;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

import utils.*;

@RunWith(value = Parameterized.class)
@SuppressWarnings("Duplicates")
public class TaskDeliveryParametrized {

  private String strId;
  private String strName;
  private String strIssuer;
  private String strIssuedate;
  private String strStartdate;
  private String strDeadlinedate;
  private String strActive;
  private String strDetail;

  private static WebDriver driver;
  private static LoginPage login;
  private static TaskListPage tasks;
  private static DeliveryStudentPage delivery;

  public TaskDeliveryParametrized(String strId, String strName, String strIssuer, String strIssuedate,
                                  String strStartdate, String strDeadlinedate, String strActive, String strDetail) {
    this.strId = strId;
    this.strName = strName;
    this.strIssuer = strIssuer;
    this.strIssuedate = strIssuedate;
    this.strStartdate = strStartdate;
    this.strDeadlinedate = strDeadlinedate;
    this.strActive = strActive;
    this.strDetail = strDetail;
  }

  @BeforeClass
  public static void setUp() {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(Constansts.IMPLICIT_WAIT, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
    try {
      login.login("Alice", "12345");
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    tasks = new TaskListPage(driver);

  }

  @Parameterized.Parameters(name = "Task id: {0}, name: {1}, issuer: {2}, issued: {3}, active: {4}, detail: {7}")
  public static Collection<String[]> testingData() {
    return CSVfileReader.readCSVfileToCollection("target/classes/delivery_windows.csv");
  }

  @Test
  public void testWithGrid() {
    tasks.openDelivery(Integer.parseInt(strId));
    delivery = new DeliveryStudentPage(driver);
    Assert.assertTrue(delivery.containsDetail(Integer.parseInt(strId), strName, strIssuer,
      strIssuedate, strStartdate, strDeadlinedate, Boolean.parseBoolean(strActive), strDetail));
    delivery.goToTaskList();
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }
}
