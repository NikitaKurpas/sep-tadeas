package selenium_tests.src;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.DeliveryStudentPage;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;

import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;

public class SubmitTaskTest {

  private static WebDriver driver;
  private static TaskListPage tasks;

  @BeforeClass
  public static void setUp() throws MalformedURLException {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(1000, TimeUnit.MILLISECONDS);
    LoginPage login = new LoginPage(driver);
    login.goTo();
    try {
      login.login("alice", String.valueOf(12345));
      tasks = new TaskListPage(driver);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  /**
   * (1) Select first task from the task list.
   * (2) Check that there are some details about the task
   * (3) Go back to the task list page
   */
  @Test
  public void selectFirstTask() {
    tasks.openDelivery(1);
    DeliveryStudentPage delivery = new DeliveryStudentPage(driver);
    Assert.assertTrue(delivery.getTaskDetail().isDisplayed());
    tasks.goToTasks();
    Assert.assertTrue(tasks.getTaskList().isDisplayed());
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }
}
