package selenium_tests.src;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;

import java.net.MalformedURLException;
import java.util.concurrent.TimeUnit;
import utils.*;

@SuppressWarnings("Duplicates")
public class ViewTasksTest {

  private static WebDriver driver;
  private static LoginPage login;
  private static TaskListPage tasks;

  @BeforeClass
  public static void setUp() {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(Constansts.IMPLICIT_WAIT, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
    try {
      login.login("alice", String.valueOf(12345));
      tasks = new TaskListPage(driver);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  @Test
  public void allTasksVisible() {
    Assert.assertEquals(3, tasks.getTaskList().findElements(By.xpath("//tbody/tr")).size());
  }

}
