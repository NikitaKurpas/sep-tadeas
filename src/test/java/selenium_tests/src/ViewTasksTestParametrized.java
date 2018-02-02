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
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;
import utils.*;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RunWith(value = Parameterized.class)
@SuppressWarnings("Duplicates")
public class ViewTasksTestParametrized {
//  TADEAS 1;1;2017-11-01;

  private String strId;
  private String strName;
  private String strIssuer;
  private String strIssuedate;
  private String strActive;

  private static WebDriver driver;
  private static LoginPage login;
  private static TaskListPage tasks;

  public ViewTasksTestParametrized(String strId, String strName, String strIssuer, String strIssuedate, String strActive) {
    this.strId = strId;
    this.strName = strName;
    this.strIssuer = strIssuer;
    this.strIssuedate = strIssuedate;
    this.strActive = strActive;
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

  @Parameterized.Parameters(name = "Task id: {0}, name: {1}, issuer: {2}, issued: {3}, active: {4}")
  public static Collection<String[]> testingData() {
    return CSVfileReader.readCSVfileToCollection("target/classes/tasks.csv");
  }

  @Test
  public void testWithGrid() {
      Assert.assertTrue(tasks.containsTask(Integer.parseInt(strId), strName, strIssuer,
        strIssuedate, Boolean.parseBoolean(strActive)));
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }

}
